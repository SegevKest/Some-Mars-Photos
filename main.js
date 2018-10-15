$(()=>{
    // adding event click to the button that shows all the photos
    $("#getAll").click(()=>{
        // clear();
        $.getJSON("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=U8ImYVWS1gQA4yTKcOrxQReVR8A5SrnlpXhVgT6Y",function(dataFromNASA){
            for(var i=0;i<dataFromNASA.photos.length;i++)
                drawCard(dataFromNASA.photos[i]);
        });
    });
// adding event submit, means when the form is sumbitted we do the ajax request
    $("#searchForm").submit(e=>{
        e.preventDefault();

        let camera=$("#cameraName").val().toLowerCase();
        clear();
        $.getJSON(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&api_key=U8ImYVWS1gQA4yTKcOrxQReVR8A5SrnlpXhVgT6Y`,function(dataFromNASA){
            for(var i=0;i<dataFromNASA.photos.length;i++)
                drawCard(dataFromNASA.photos[i]);
        });
    })

})
function clear() {
    $("#photosList").html('');
}

// function that build the card for every photo
function drawCard(photoObj){
    let photoDate=photoObj.earth_date,
        photo=photoObj.img_src,
        photoId=photoObj.id,

        cardContainer = $(`<div class="card country shadow-sm animated fadeInRight">
        <img class="card-img-top marsPhoto" src="${photo}"></div>`),
        cardBody = $(`<div class="card-body"></div>`),
        tBodyText = $(`<h5 class="card-title">Photo Id: ${photoId}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Date Taken: ${photoDate}</h6>`);
        cardTable=drawDetailsTable(photoObj);

        cardBody.append(tBodyText,cardTable);
        cardContainer.append(cardBody);

        $("#photosList").append(cardContainer);
}

// Return camera template <div>(table)
function drawDetailsTable(photoObj){

    let cameraName=photoObj.camera.full_name,
        cameraId=photoObj.camera.id,
        roverName=photoObj.rover.name,
        roverId=photoObj.rover.id,
        roverPhotoesTaken=photoObj.rover.total_photos,
        roverPhotos=`<h6 class="card-subtitle mb-2 ">Total Rover Photos${roverPhotoesTaken}</h6>`
        cameraTemplate = document.createElement('div'),
        cameraTemplateTable = document.createElement('table'),
        cameraTemplateHead = document.createElement('thead'),
        cameraTemplateBody = document.createElement('tbody');

    cameraTemplate.setAttribute('class', 'table-responsive');
    cameraTemplateTable.setAttribute('class', 'table table-striped table-dark');
    cameraTemplateHead.innerHTML = `
        <tr>
            <th scope="col">Tool</th>
            <th scope="col">Name</th>
            <th scope="col">ID</th>
        </tr>
    `;
    cameraTemplateTable.appendChild(cameraTemplateHead);

    cameraTemplateBody.innerHTML=  `
        <tr>
            <td scope="col">Rover</th>
            <td scope="col">${roverName}</th>
            <td scope="col">${roverId}</th>
        </tr>
        <tr>
            <th scope="col">Camera</th>
            <th scope="col">${cameraName}</th>
            <th scope="col">${cameraId}</th>
        </tr>
    `;
    cameraTemplateTable.appendChild(cameraTemplateBody);
    cameraTemplate.appendChild(cameraTemplateTable);

    return cameraTemplate;
}



