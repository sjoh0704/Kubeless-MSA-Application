
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import urllib.request
from io import BytesIO

def handler(event, context):
    print("event occurs")
    try:
        url = event['data']['imageUzRL']
        # url = "https://hanbucket-test.s3.ap-northeast-2.amazonaws.com/img.png"
        # print(url)
        req = urllib.request.Request(url, headers = {"User-Agent" : "Mozilla/5.0"})
        res = urllib.request.urlopen(req).read()
        image = Image.open(BytesIO(res))

         # keras 
        model = load_model('./model/model.savedmodel')
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array
        prediction = model.predict(data)

        #result
        print("사람:", float(prediction[0][0]))
        print("손바닥:", float(prediction[0][1]))
        return 'ok'
        
    except Exception as e:
        print(e)
        return 'fail'

   
# handler(1, 1)

