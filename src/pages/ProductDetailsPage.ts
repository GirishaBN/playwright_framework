import { Locator, Page } from "@playwright/test";

class ProductDetailsPage
{
productName:Locator;
productImages:Locator;
productMetadata:Locator;
pricingMetadata:Locator;
map:Map<string,string>;
constructor(page:Page){
this.productName=page.getByRole('heading', { level: 1 });
this.productImages=page.locator('div#content ul.thumbnails img');
this.productMetadata=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
this.pricingMetadata=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
this.map=new Map();
}

async getProductName()
{
    return this.productName.innerText();
}
async getProductImageCount(){
    return this.productImages.count();
}
async getProductMetadata()
{
let productData=await this.productMetadata.allInnerTexts()
for(let data of productData)
{
const[key,value]=data.split(':');
this.map.set(key.trim(),value.trim());
}
}


/* $122.00
$110.00
Ex Tax: $90.00
Price in reward points: 400
10 or more $107.60
20 or more $94.40
30 or more $81.20 */
async getPricingMetadata()
{
let pricingdata=await this.pricingMetadata.allInnerTexts();
 pricingdata.forEach(data=>{
    if(data.split(':').length==2)
    {
        let metadata=data.split(':');
        let metadataKey=metadata[0].trim();
        let metadataValue=metadata[1].trim();
        this.map.set(metadataKey,metadataValue)
    }
    else{
    let productPrice=data[0].trim();
    let discountedPrice=data[1].trim();
    let exTax=data[2].split(':')[1].trim();
    let priceInRewardPoints=data[3].split(':')[1].trim();
    }
    
})
}
}