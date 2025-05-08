from fastapi import FastAPI, Request,Query
import numpy as np
import pandas as pd
import csv

from sklearn.linear_model import LinearRegression
from typing import List
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.delete("/delete_data/")
def delete_data(date: str = Query(...)):
    updated_rows = []
    with open("dummy_data.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["Date"] != date:
                updated_rows.append(row)

    with open("dummy_data.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=updated_rows[0].keys())
        writer.writeheader()
        writer.writerows(updated_rows)

    return {"message": "削除完了"}

@app.post("/add_data_to_csv/")
async def add_data_to_csv(request: Request):
    file_path = "dummy_data.csv"
    new_data = await request.json()

    df_new = pd.DataFrame([{
        "Voltage (V)": float(new_data["voltage"]),
        "Temperature (°C)": float(new_data["temperature"]),
        "Flow Speed (m/s)": float(new_data["flow_speed"]),
        "Date": new_data["date"]
    }])

    if os.path.exists(file_path):
        df_existing = pd.read_csv(file_path)
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_csv(file_path, index=False)
    else:
        df_new.to_csv(file_path, index=False)

    return {"message": "Data added successfully"}


@app.get("/get_numerical_data/")
def get_numerical_data():
    file_path = "dummy_data.csv"
    
    if not os.path.exists(file_path):
        raise ValueError(f"{file_path} does not exist.")
    
    data = pd.read_csv(file_path)

    voltage = data['Voltage (V)'].tolist()
    temperature = data['Temperature (°C)'].tolist()
    flow_speed = data['Flow Speed (m/s)'].tolist()
    dates = data['Date'].tolist()

    result = {
        "date": dates,
        "voltage": voltage,
        "temperature": temperature,
        "flow_speed": flow_speed,
    }

    return JSONResponse(content=result)

@app.get("/save_data_to_csv/")
def save_data_to_csv():
    np.random.seed(0)
    voltage = np.random.uniform(1000, 3000, 50)
    temperature = np.random.uniform(30, 50, 50)
    flow_speed = 0.003 * voltage + 0.02 * temperature + np.random.normal(0, 0.5, 50)

    # データをDaaFrameに格納
    data = pd.DataFrame({
        'Voltage (V)': voltage,
        'Temperature (°C)': temperature,
        'Flow Speed (m/s)': flow_speed
    })

    # CSVファイルに保存
    file_path = "dummy_data.csv"
    data.to_csv(file_path, index=False)

    return {"message": f"Data saved to {file_path}"}

class InputData(BaseModel):
    voltage: float
    temperature: float

@app.post("/predict/")
def predict_flow_speed(input_data: InputData):
    file_path = "dummy_data.csv"
    if not os.path.exists(file_path):
        raise ValueError(f"{file_path} does not exist.")

    data = pd.read_csv(file_path)

    X = data[['Voltage (V)', 'Temperature (°C)']]
    y = data['Flow Speed (m/s)']

    model = LinearRegression()
    model.fit(X, y)

    # 予測
    voltage_input = input_data.voltage
    temperature_input = input_data.temperature
    predicted_flow = model.predict(np.array([[voltage_input, temperature_input]]))

    return {"predicted_flow_speed": predicted_flow[0]}

@app.get("/get_3d_data/")
def get_3d_data():
    file_path = "dummy_data.csv"
    
    if not os.path.exists(file_path):
        raise ValueError(f"{file_path} does not exist.")
    
    data = pd.read_csv(file_path)

    result = {
        "voltage": data['Voltage (V)'].tolist(),
        "temperature": data['Temperature (°C)'].tolist(),
        "flow_speed": data['Flow Speed (m/s)'].tolist(),
    }

    return JSONResponse(content=result)
