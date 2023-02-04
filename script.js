function createGrid()
{
    gridSize = 16;
    const gridContainer = document.querySelector('.grid-container');
    const grid = document.createElement('div');
    grid.classList.add('grid')
    
    for(let i=0; i<gridSize; i++)
    {
        let column = document.createElement('div');
    
        for(let j=0; j<gridSize; j++)
        {
            let block = document.createElement('div');
            block.classList.add('block');
            column.appendChild(block);
        }
        column.classList.add('grid-column');
        grid.appendChild(column);
    }
    let width = (gridSize*22);
    grid.style.width = width + 'px';
    grid.style.height = width + 'px';
    
    gridContainer.append(grid);
}

function draw(color)
{   
    console.log('called');
    let isMouseDown = false;

    console.log(blocks);
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

/*
const erase = document.querySelector('.erase');
const draw = document.querySelector('.draw');
const clear = document.querySelector('.clear');
*/

createGrid();
const blocks = document.querySelectorAll('.block');
draw('black');


const buttons = document.querySelectorAll('button');

buttons.forEach(function(button){
    button.addEventListener('click', function(){
        console.log(button.class)
        if(button.class == 'draw'){
            draw('black');
        }
        else if(button.class == 'erase')
        {
            draw('white');
        }
        else
        {
            blocks.forEach(function(block){
                block.style.backgroundColor = 'white'
            });
        }
    });
});

/*
erase.addEventListener('click', function(){
    draw('white');
});
*/