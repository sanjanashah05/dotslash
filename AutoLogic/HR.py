import cv2
import numpy as np
from scipy.signal import find_peaks

def estimate_heart_rate():
    cap = cv2.VideoCapture(0)  # Use webcam
    buffer_size = 300  # Number of frames to analyze
    green_values = []

    while len(green_values) < buffer_size:
        ret, frame = cap.read()
        if not ret:
            break

        # Convert to RGB and extract the green channel
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        green_channel = rgb_frame[:, :, 1]

        # Calculate the mean green value
        mean_green = np.mean(green_channel)
        # cv2.imshow()
        green_values.append(mean_green)

        # Display the frame
        cv2.imshow("Heart Rate Estimation", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # Analyze the green signal
    peaks, _ = find_peaks(green_values, distance=30)
    bpm = len(peaks) * (60 / buffer_size)
    print(f"Estimated Heart Rate: {bpm:.2f} BPM")

# Run the function
estimate_heart_rate()