from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import torchaudio
import uvicorn
import os

# STT 모델 로드
MODEL_NAME = "Kkonjeong/wav2vec2-base-korean"
model = Wav2Vec2ForCTC.from_pretrained(MODEL_NAME)
processor = Wav2Vec2Processor.from_pretrained(MODEL_NAME)

model.to("cuda" if torch.cuda.is_available() else "cpu")
model.eval()

def load_and_preprocess_audio(file_path):
    speech_array, sampling_rate = torchaudio.load(file_path)
    if sampling_rate != 16000:
        resampler = torchaudio.transforms.Resample(sampling_rate, 16000)
        speech_array = resampler(speech_array)
    input_values = processor(speech_array.squeeze().numpy(), sampling_rate=16000).input_values[0]
    return input_values

def predict(file_path):
    input_values = load_and_preprocess_audio(file_path)
    input_tensor = torch.tensor(input_values).unsqueeze(0).to(model.device)
    with torch.no_grad():
        logits = model(input_tensor).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)[0]
    return transcription

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/stt")
async def stt_endpoint(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as f:
            f.write(contents)

        transcription = predict(temp_path)

        os.remove(temp_path)

        return {"transcript": transcription}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)