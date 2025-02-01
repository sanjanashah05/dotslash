import cv2
import numpy as np

def detect_yellowish_percentage(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Unable to load image. Please check the file path.")
        return None

    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    
    lower_yellow = np.array([20, 100, 100])
    upper_yellow = np.array([30, 255, 255])

    yellow_mask = cv2.inRange(hsv_image, lower_yellow, upper_yellow)

    # cv2.imshow('yellow_mask', yellow_mask)

    # Count the number of yellow pixels
    yellow_pixels = cv2.countNonZero(yellow_mask)

    # Calculate the percentage of yellow pixels in the image
    total_pixels = image.shape[0] * image.shape[1]
    yellow_percentage = (yellow_pixels / total_pixels) * 100

    return yellow_percentage

# Example usage
image_path = "4.jpg"
yellow_percentage = detect_yellowish_percentage(image_path)
if yellow_percentage is not None:
    print(f"Percentage of yellowish pixels: {yellow_percentage:.2f}%")