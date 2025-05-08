export async function predictFlowSpeed(voltage: number, temperature: number) {
    const response = await fetch('http://127.0.0.1:8000/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voltage, temperature }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data.predicted_flow_speed;
  }
  