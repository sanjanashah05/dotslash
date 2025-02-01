import cv2
import numpy as np

def detect_eye_redness(image_path):
    # Load the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image. Please check the file path.")
        return

    # Convert to grayscale for face/eye detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load Haar Cascade classifiers
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = image[y:y+h, x:x+w]

        # Detect eyes within the face ROI
        eyes = eye_cascade.detectMultiScale(roi_gray)

        for (ex, ey, ew, eh) in eyes:
            eye_roi = roi_color[ey:ey+eh, ex:ex+ew]

            # Split the eye region into RGB channels
            b, g, r = cv2.split(eye_roi)

            # Calculate the average red intensity
            red_intensity = np.mean(r)

            # Display results
            if red_intensity > 150:  # Threshold for redness
                print("Eye redness detected!")
            else:
                print("No significant redness detected.")

            # Draw a rectangle around the eye
            cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)

    # Show the output image
    cv2.imshow("Eye Redness Detection", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Test the function with an image
detect_eye_redness("80.webp")