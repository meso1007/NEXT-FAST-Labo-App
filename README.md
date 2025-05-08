# Sekimoto Lab Student Web App 🧪📊

This is a web application built specifically for students in the **Sekimoto Laboratory** to help with recording, visualizing, and predicting experimental data.

## 🚀 Features

- Add, retrieve, and delete experimental data (saved in CSV format)
- Predict flow speed using linear regression based on voltage and temperature
- Generate dummy data for simulation
- Retrieve data for 3D visualization

## 🛠 Tech Stack

- **Backend**: FastAPI (Python 3.9+)
- **Data Processing**: pandas, numpy, scikit-learn
- **Model**: Linear Regression (from scikit-learn)
- **Middleware**: CORS (Cross-Origin Resource Sharing)
- **File Storage**: CSV files

## 🧠 Skill Set Applied

- Python API development with FastAPI  
- RESTful API design and implementation  
- CSV-based data storage and parsing  
- Data preprocessing and modeling with NumPy, pandas, scikit-learn  
- Frontend and backend data communication using JSON  
- Predictive modeling for experimental data  
- API response handling and validation with Pydantic  

## 📡 API Endpoints

| Method | Path                       | Description |
|--------|----------------------------|-------------|
| `POST` | `/add_data_to_csv/`        | Add a new record to the CSV file |
| `GET`  | `/get_numerical_data/`     | Fetch all data from the CSV |
| `DELETE` | `/delete_data/?date=YYYY-MM-DD` | Delete a record by date |
| `GET`  | `/save_data_to_csv/`       | Generate and save dummy data |
| `POST` | `/predict/`                | Predict flow speed from voltage and temperature |
| `GET`  | `/get_3d_data/`            | Retrieve 3D graph-friendly data |

## 🧪 `/predict/` 
  
![Predict endpoint screenshot](/labo-app/public/readme/predict.png)
This endpoint receives input values for voltage and temperature, then uses a linear regression model to predict the flow speed.
It simulates how experimental data can be processed and visualized for research purposes, such as 3D modeling of fluid behavior based on sensor readings.
This can be applied in lab environments to support real-time predictions and data-driven analysis.
