import cv2
import dlib
import numpy as np

def detect_facial_asymmetry(image_path):
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image. Please check the file path.")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load Dlib's facial landmark detector
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

    # Detect faces
    faces = detector(gray)
    for face in faces:
        landmarks = predictor(gray, face)

        # Extract key points for symmetry analysis
        left_eye_x = landmarks.part(36).x  # Left eye corner
        right_eye_x = landmarks.part(45).x  # Right eye corner
        nose_tip_x = landmarks.part(30).x  # Nose tip

        # Calculate horizontal distances
        left_distance = abs(nose_tip_x - left_eye_x)
        right_distance = abs(right_eye_x - nose_tip_x)

        # Check for asymmetry
        asymmetry_ratio = left_distance / right_distance
        if asymmetry_ratio < 0.8 or asymmetry_ratio > 1.2:  # Threshold for asymmetry
            print(f"Facial asymmetry detected! Ratio: {asymmetry_ratio:.2f}")
        else:
            print(f"No significant asymmetry detected. Ratio: {asymmetry_ratio:.2f}")

        # Draw landmarks on the face
        for n in range(0, 68):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            cv2.circle(image, (x, y), 2, (0, 255, 0), -1)

    # Show the output image
    cv2.imshow("Facial Asymmetry Detection", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Test the function with an image
detect_facial_asymmetry("80.webp")