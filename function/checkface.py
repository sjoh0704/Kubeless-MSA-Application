from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import urllib.request
from io import BytesIO
import requests, json

def handler(event, context):
    try:
        userId, url = event["data"].decode().split()
        req = urllib.request.Request(url, headers = {"User-Agent" : "Mozilla/5.0"})
        res = urllib.request.urlopen(req).read()
        image = Image.open(BytesIO(res)).convert('RGB')

        # keras
        print(3)
        if userId[0] == '0':
            model = load_model('/kubeless/model/male/keras_model.h5')
            print('male')
        else:
            model = load_model('/kubeless/model/female/keras_model.h5')
            print('female')

        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array
        prediction = model.predict(data)
        
        #result
        data = {
            'userId': userId,
            'cat': float(prediction[0][0]),
            'dog': float(prediction[0][1]),
            'dino': float(prediction[0][2]),
            'bear': float(prediction[0][3]),
            'fox': float(prediction[0][4]),
            'rabbit': float(prediction[0][5])
        }
        print(data)
        headers = {'Content-Type': 'application/json; charset=utf-8'}
        # res = requests.post("http://localhost:8080/api/v1/info", data=json.dumps(data), headers=headers)
        res = requests.post("http://backend-service.default.svc:8080/api/v1/info", data=json.dumps(data), headers=headers)
        print(res.text)
        return 'ok'
        
    except Exception as e:
        print(e)
        return 'fail'



   
# handler(1, 1)
