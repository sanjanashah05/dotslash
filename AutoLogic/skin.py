import cv2
import numpy as np

def detect_yellowish_percentage(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return "Error: Unable to load image. Please check the file path."

    # Convert the image to HSV color space
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define the range for yellow color in HSV
    lower_yellow = np.array([20, 100, 100])
    upper_yellow = np.array([30, 255, 255])

    # Create a mask for yellow pixels
    yellow_mask = cv2.inRange(hsv_image, lower_yellow, upper_yellow)

    # Count the number of yellow pixels
    yellow_pixels = cv2.countNonZero(yellow_mask)

    # Calculate the percentage of yellow pixels in the image
    total_pixels = image.shape[0] * image.shape[1]
    yellow_percentage = (yellow_pixels / total_pixels) * 100

    return f"Percentage of yellowish pixels: {yellow_percentage:.2f}%"