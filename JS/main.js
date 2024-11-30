




function DragStart(e){

  var DragHolders     = document.querySelectorAll('.Drag-in-holder');
  var selectd         =  e.target;
  var Selectd_row_id  = selectd.getAttribute('row-id');

  
  ColorAllBordersWithSameRowID(Selectd_row_id);



    for(Holder of DragHolders){


      Holder.addEventListener('dragover', (e)=>{
        e.preventDefault();
      });

      Holder.addEventListener('drop', (ev)=>{
        var holder = ev.target;
        holder_row_id = holder.getAttribute('row-id');
        if(holder_row_id == Selectd_row_id){
          var amount = Handel_item_spilt(event, selectd, holder);
        }

        DragHolders = null;
        selectd = null;
        Selectd_row_id = null;
        holder = null;
      });



    }// End For Holder
}






// ============================== Gloabl Function ==================

function CheckIfDropedInBorderHaveItem (DropedInBorder){
  let Havechild = true;

  if(DropedInBorder.hasChildNodes){
    Havechild = false;
  }

  return true;
}

function ColorAllBordersWithSameRowID(row_id){


  let Borders = document.querySelectorAll(`.Drag-in-holder[row-id="${row_id}"]`);
  for(Border of Borders){
    Border.classList.add('currentID');
  }
}


function removeClasswhenDragover(){
  let Borders = document.querySelectorAll(`.Drag-in-holder[row-id]`);
  for(Border of Borders){
    Border.classList.remove('currentID');
  }
}