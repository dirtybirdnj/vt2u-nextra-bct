const http = require("http");
const https = require("https");
const urlModule = require("url");
const querystring = require("querystring");
const htmlparser = require("htmlparser2");

const url = "https://vt2u.creator-spring.com";

const requestModule = url.startsWith("https") ? https : http;

requestModule.get(url, (response) => {
  let responseData = "";
  response.on("data", (chunk) => {
    responseData += chunk;
  });
  response.on("end", () => {
    const products = [];
    const urlObj = urlModule.parse(url);

    const parser = new htmlparser.Parser({
      onopentag(name, attribs) {
        if (name === "a" && attribs.class === "product-card__link") {
          const product = {
            name: "",
            url: "",
            image: "",
            price: "",
          };
          product.url = urlObj.protocol + "//" + urlObj.hostname + attribs.href;
          products.push(product);
        } else if (name === "img" && attribs.class === "product-card__image") {
          const product = products[products.length - 1];
          product.image = attribs.src;
        } else if (name === "span" && attribs.class === "product-card__price") {
          const product = products[products.length - 1];
          product.price = attribs["data-display-price"];
        } else if (name === "h3" && attribs.class === "product-card__title") {
          const product = products[products.length - 1];
          parser.once("text", (text) => {
            product.name = text.trim();
          });
        }
      },
      onend() {
        console.log(JSON.stringify(products, null, 2));
      },
    });
    parser.write(responseData);
    parser.end();
  });
}).on("error", (error) => {
  console.log(error);
});
