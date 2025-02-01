import cv2
import numpy as np

# Load pre-trained Haar Cascade models
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

def detect_eye_color(image_path):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image. Please check the file path.")
        return

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Define the region of interest (ROI) for the face
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = image[y:y+h, x:x+w]

        # Detect eyes within the face ROI
        eyes = eye_cascade.detectMultiScale(roi_gray)

        # Ensure we detect exactly two eyes
        if len(eyes) == 2:
            for (ex, ey, ew, eh) in eyes:
                # Extract the eye region
                eye_roi = roi_color[ey:ey+eh, ex:ex+ew]

                # Convert the eye region to HSV color space
                hsv_eye = cv2.cvtColor(eye_roi, cv2.COLOR_BGR2HSV)

                # Calculate the histogram of the hue channel
                hist = cv2.calcHist([hsv_eye], [0], None, [180], [0, 180])

                # Find the dominant hue value
                dominant_hue = np.argmax(hist)

                # Map the hue value to a color label
                if dominant_hue < 10 or dominant_hue > 160:
                    color_label = "Reddish/Brown"
                elif 10 <= dominant_hue < 30:
                    color_label = "Brown"
                elif 30 <= dominant_hue < 70:
                    color_label = "Green"
                elif 70 <= dominant_hue < 100:
                    color_label = "Blue-Green"
                else:
                    color_label = "Blue"

                print(f"Detected Eye Color: {color_label}")

                # Draw a rectangle around the eye
                cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)
                cv2.putText(roi_color, color_label, (ex, ey - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display the output image with bounding boxes and labels
    cv2.imshow("Eye Color Detection", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Test the function with your image
detect_eye_color("11.jpg")