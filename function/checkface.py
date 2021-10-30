
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import urllib.request
def handler(event, context):
    print("event occurs")
    # download image
    url = "https://hanbucket-test.s3.ap-northeast-2.amazonaws.com/01d577eb45b1950127a6f4aaccbb5b2f.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaDmFwLW5vcnRoZWFzdC0yIkgwRgIhAMGpCMaDSHaNYyXa3U%2FKR9NYXBIteoQwshp0OBpE6bvLAiEAwKDybDuRZKB4JDLd5UUJNyGtPk%2BW1inHGUQkf1%2FrQfoqlgMIy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3NTI5NDMxOTc2NzgiDLdCfU4BltFWsPkXJirqAlKOJAEbh5IGJSguWDpLxq6YCDLCwtosMC6JIGeKPDrrzXtbrISjRd%2BalIdHok6zZ4thkZ2Dh7bgu7YPpBeR7TEmyI4BXXPG26tDo%2BUO3FMwnm5OSqLD%2FDYewuGYpgqKEXBmhKh7r24Pe%2B5SG1Uf2HTGXCEpnhTTgUsVuv%2B8KGoTX3O96AR5ledRG4YKO1sHxIiAja4NfFXaQLy6yiHUaiTlIZuxsKwSRJqxufDYFUm3nXWJXCADQuURGiO2Z49HtYsGzFV7ys6bFuCCYrNMU9saAssICve4PtmCQQ9nJdMRfawE4%2F9hl1OPTzrENgA6AHSrqj5Y5d6x6kv6J0S7ShcCgNoM3oDn5onV84OodxhxAhs5SE2JNVvehcyixC0lOdI3qIV6JvkbeSNeCnk4Z9VVvWAutl%2FQMUqL0Ok%2BTZ8MWqtKBbm5q67WyElcBKMzQfP8iX7j8GZ2TFpHYuJ1ymxjrv3hyYUkZ7YQMITI8osGOrICAJ7vqg%2BxrUco9FdJydnwNEmMNTreaGrnbJUQfrcxlQXJV74a14jqJvUaTFEaLFUipzVkIK78JMapOdRA89gdbWtytNbZ4%2BctNp5%2FkfLok4W%2Fz0ttSvXhcFuczAfb%2FVoWgZlK%2FGPxGELHAk2vVB0FukUMJ7kiLcfiiZuwPvpf9blI7OVGo4OKLcK38OwwW8Xtj39qyduPApJK0ntUT8YkgnkTmzC0kGRKJ6%2FA7O83Bb4madmYVcODy9UfKzyBnd3bDBI7ar400TvHA%2Bcyw1cuvy%2FPo%2FU9yB7u3KzFg4gC4pW5yUSvSBcqlcem0FlcscQJfrSYEttjw2TWaVtpChY6ThsixiW96R8pxlC9%2BfCvy0xvH84768CEuBTjKa7zbX4PZXlF6tPCHL%2Fg%2FjzcH1afIObp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211030T063639Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26TXJNXXN345RYER%2F20211030%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=8b08fe4e08d40cb8b6b3ca986d1aef8cba2e7afdc9cd53c87ac21cf4011fee8e"
    urllib.request.urlretrieve(url, "test.jpg")
    
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
handler(1, 1)
