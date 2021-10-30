
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import urllib.request
def handler(event, context):
    print("event occurs")
    # download image
    try:
        url = event['data']
        urllib.request.urlretrieve(url, "test.jpg")
    except Exception as e:
        print(e)
        return 

    # keras 
    model = load_model('./model/keras_model.h5')
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    image = Image.open('./test.jpg')
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    data[0] = normalized_image_array
    prediction = model.predict(data)

    #result
    print("사람:", float(prediction[0][0]))
    print("손바닥:", float(prediction[0][1]))
# handler(1, 1)
