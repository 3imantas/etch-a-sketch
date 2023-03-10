const maxGridSize = 32; // 32x32
let gridSize = 16;  // 16x16 blocks
let blockSize; // 20x20px

const gridContainer = document.querySelector('.grid-container');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
const drawButton = document.querySelector('.draw');
const eraseButton = document.querySelector('.erase');
const colorSelector = document.querySelector('input[type="color"]');

let drawIsClicked = true;
let eraseIsClicked = false;

const buttons = document.querySelectorAll('button');

function createGrid()
{   
    const grid = document.createElement('div');
    grid.classList.add('grid')

    for(let i=0; i<gridSize; i++)
    {
        let column = document.createElement('div');
        column.classList.add('grid-column');
    
        for(let j=0; j<gridSize; j++)
        {
            let block = document.createElement('div');
            block.classList.add('block');
            column.appendChild(block);
        }
        grid.appendChild(column);
    }
    
    gridContainer.append(grid);

    blockSize = 500/gridSize-2;
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block){
        block.style.height = blockSize + 'px';
        block.style.width = blockSize + 'px';
    });
}

function removeGrid()
{
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block){
        block.remove();
    });

    const columns = document.querySelectorAll('.grid-column');
    columns.forEach(function(col){
        col.remove();
    });

    const grid = document.querySelector('.grid');
    grid.remove();
}

function draw(color)
{   
    let isMouseDown = false;
    const blocks = document.querySelectorAll('.block');

    blocks.forEach(function(block){
        block.addEventListener('mousedown', function(){
            isMouseDown = true;
            block.style.backgroundColor = color;
        });
    
        block.addEventListener('mouseup', function()
        {
            isMouseDown = false;
        });
    
        block.addEventListener('mouseenter', function(){
            if(isMouseDown){
                block.style.backgroundColor = color;
            }
        });
    });
}

function handleClick(button)
{
    const blocks = document.querySelectorAll('.block');
    //console.log(button.className)
    if(button.className == 'draw' || button.className == 'draw clicked'){
        if(drawIsClicked != true)
        {
            button.classList.add('clicked');
            draw(colorSelector.value);
            drawIsClicked = true;
            eraseIsClicked = false;
            eraseButton.classList.remove('clicked');
        }
    }
    else if(button.className == 'erase' || button.className == 'erase clicked')
    {   
        if(eraseIsClicked != true)
        {
            button.classList.add('clicked');
            draw('white');
            eraseIsClicked = true;
            drawIsClicked = false;
            drawButton.classList.remove('clicked');
        }
    }
    else
    {
        blocks.forEach(function(block){
            block.style.backgroundColor = 'white'
        });
        button.classList.add('clicked');

        setTimeout(function(){
            button.classList.remove('clicked');
        },0.1*1000);

        if(drawIsClicked != true)
        {
            drawButton.classList.add('clicked');
            draw(colorSelector.value);
            drawIsClicked = true;
            eraseIsClicked = false;
            eraseButton.classList.remove('clicked');
        }
    }
}


sliderValue.textContent = gridSize +' x '+ gridSize;
createGrid();

drawButton.classList.add('clicked');
draw(colorSelector.value);


buttons.forEach(function(button){
    
    let clickHandler = function(){
        handleClick(button);

    };

    button.addEventListener('click', clickHandler);

});

let inputHandler = function(){
    
    let value = (slider.value/100)*(maxGridSize-1)+1;
    gridSize = Math.floor(value);
    sliderValue.textContent = gridSize +' x '+ gridSize;
    removeGrid();
    createGrid();
    draw(colorSelector.value);
};

slider.addEventListener('input', inputHandler);

/*
colorSelector.addEventListener('change', function(){
    draw(colorSelector.value);
});
*/

let lastInputTime;
colorSelector.addEventListener('change', function(){
    draw(colorSelector.value)
});