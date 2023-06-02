loadAllData("https://fakestoreapi.com/products")




function loadAllData(urlThis){
    fetch(urlThis)
    .then(AllData=>AllData.json())
    .then(allDataInJson=>{
        
        var manData = fileterValue(allDataInJson,"men's clothing")
        var womansData = fileterValue(allDataInJson,"women's clothing")
        var jewallryData = fileterValue(allDataInJson,"jewelery")
        var electronicsData = fileterValue(allDataInJson,"electronics")
                
            
            showInDiv('all-cards-mans',manData)
            showInDiv('all-cards-womans',womansData)
            showInDiv('all-cards-jewelry',jewallryData)
            showInDiv('all-cards-electorincs',electronicsData)
    
    }).catch(e=>{console.log("No data")});
}
// search bar
function searchProducts() {
   
    const searchTerm = document.getElementById('search-input').value;
  

    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
       
        const filteredProducts = data.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        var manData = fileterValue(filteredProducts,"men's clothing")
        var womansData = fileterValue(filteredProducts,"women's clothing")
        var jewallryData = fileterValue(filteredProducts,"jewelery")
        var electronicsData = fileterValue(filteredProducts,"electronics")
  
            showInDiv('all-cards-mans',manData)
            showInDiv('all-cards-womans',womansData)
            showInDiv('all-cards-jewelry',jewallryData)
            showInDiv('all-cards-electorincs',electronicsData)
        console.log(filteredProducts);
        
      })
      .catch(error => {
        console.log('Error fetching products:', error);
      });
  }



// additional function 


// fileter data 
function fileterValue(allDataInJson,checkValue){
    return allDataInJson.filter((value)=>{
    if(value.category==checkValue)
           return value;
})
}

// show in div
function showInDiv(id,data){
    const jewelryDivId = document.getElementById(id);
    jewelryDivId.innerHTML="";
    // console.log(id,data,jewelryDivId,"may data")
    data.forEach(element => {
        
    
        const div = `
        <div class="card">
            <div class="card-head">
                <img src="${element.image}" alt="${element.title}" class="img-card img-card-1" id="">
            </div>
            <div class="card-body">
                <div class="price-size" id="price-size">
                    <div class="price comm-heading">$${element.price}</div>
                    <div class="size">S,M,L</div>
                </div>
                <div class="color-show" id="color-show">
                    <div class="color-heading comm-heading">Colors:</div>
                    <div class="small-divs">
                        <div class="small-color-div sm-color-1" id=""></div>
                        <div class="small-color-div sm-color-2" id=""></div>
                        <div class="small-color-div sm-color-3" id=""></div>
                    </div>
                </div>
                <div class="rating" id="rating">
                    <div class="rating-heading comm-heading">Rating:</div>
                    <div class="rating-small-divs">
                        <div class="small-rating-div sm-rating-1" id="">
                            <img src="./images/Star2.png" alt="" class="star-img-icon">
                        </div>
                        <div class="small-rating-div sm-rating-2" id="">
                            <img src="./images/Star2.png" alt="" class="star-img-icon">
                        </div>
                        <div class="small-rating-div sm-rating-3" id="">
                            <img src="./images/Star2.png" alt="" class="star-img-icon">
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="addcart-btn" id="">
                <button class="btn btn-5 btnWidth-100" onclick="addToCart(${element.id})">Add To Cart</button> 
            </div>
        </div>`;
// console.log(div);
    jewelryDivId.innerHTML+=div;
    });
}

// add to cart
function addToCart(idthis){
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
       
        const filteredProducts = data.filter((product) =>{
          if(product.id==idthis){
            return product;
          }
        });

        
        console.log(filteredProducts);
        if(!localStorage.getItem("myCart")){
            localStorage.setItem("myCart",JSON.stringify(filteredProducts));
            
        }else{
            let mycartAll = JSON.parse(localStorage.getItem('myCart'));
            mycartAll.push(filteredProducts[0])
            localStorage.setItem("myCart",JSON.stringify(mycartAll));
            // console.log(filteredProducts[0],mycartAll,"else")
        }
        
      })
      .catch(error => {
        console.log('Error fetching products:', error);
      });

}



// shorting by button 

function mainFilterButton(id){
    const manId = document.getElementById("all-cards-mans");
    const womanId = document.getElementById("all-cards-womans");
    const jewelryId = document.getElementById("all-cards-jewelry");
    const electorincsId = document.getElementById("all-cards-electorincs");
    

}

function styleDisplay(div,subDiv,btnId,all=false){
    document.getElementById("filter-btn-1").classList.remove("activeBtn")
    document.getElementById("filter-btn-2").classList.remove("activeBtn")
    document.getElementById("filter-btn-3").classList.remove("activeBtn")
    document.getElementById("filter-btn-4").classList.remove("activeBtn")
    document.getElementById("filter-btn-5").classList.remove("activeBtn")
    

    document.getElementById(btnId).classList.add("activeBtn")

    if(all){
        document.getElementById("main-mens").style.display="block";
        document.getElementById("main-womens").style.display="block";
        document.getElementById("main-jewelry").style.display="block";
        document.getElementById("main-electronics").style.display="block";
    }else{
        document.getElementById("main-mens").style.display="none";
        document.getElementById("main-womens").style.display="none";
        document.getElementById("main-jewelry").style.display="none";
        document.getElementById("main-electronics").style.display="none";
        
        document.getElementById("all-cards-mans").style.cssText='flex-wrap:;';
        document.getElementById("all-cards-womans").style.cssText='flex-wrap:;';
        document.getElementById("all-cards-jewelry").style.cssText='flex-wrap:;';
        document.getElementById("all-cards-electorincs").cssText='flex-wrap:;';

        document.getElementById(div).style.cssText=`display="flex"; flex-wrap:wrap;`
        document.getElementById(subDiv).style.cssText=`display="flex"; flex-wrap:wrap;`
    }
}