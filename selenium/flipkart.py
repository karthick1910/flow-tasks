from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import json


def initialize_driver():
    return webdriver.Chrome(ChromeDriverManager().install())

def main():
    driver = initialize_driver()

    driver.get("https://www.flipkart.com/search?q=laptops&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off")
    
    try:
        products=[] #List to store name of the product
        prices=[] #List to store price of the product

        product_names = driver.find_elements_by_xpath("//div[contains(@class , '_4rR01T')]")
        product_prices = driver.find_elements_by_xpath("//div[contains(@class , '_30jeq3 _1_WHN1')]")
    
        for product in product_names :
            products.append(product.text)

        for product in product_prices :
            print(product.text)
            prices.append(product.text)
        
        json_object = json.dumps({'Product Name':products,'Price':prices}, indent = 4)

        with open("file.json", "w") as outfile:
            outfile.write(json_object)
    
    finally:
        driver.quit()


if __name__ == '__main__':
    main()