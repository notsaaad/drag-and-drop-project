  function createNewItem(draggedItem, allocatedAmount) {
  if (!draggedItem) {
      return '<div>Error: Invalid item</div>';
  }

  var description = draggedItem.data('description') || 'Unnamed';
  var color = draggedItem.data('color') || '#30B05E';
  var itemNo = draggedItem.data('item-no') || 'N/A';
  var totalQty = draggedItem.data('qty') || '0';
  var unit = draggedItem.data('unit') || '';

  return `
  <table style="width: 100%;">
      <tr><td colspan="2"><strong>${description}</strong></td></tr>
      <tr>
          <td style="display: flex; align-items: center;">
              <div style="width: 12px; height: 12px; background-color: ${color}; margin-right: 5px;"></div>
              ${itemNo}
          </td>
          <td style="text-align: right;">
              ${allocatedAmount.toFixed(2)} ${unit}
          </td>
      </tr>
  </table>
  `;
  }

  function updateRemainingQty(item, allocatedAmount) {
  let newAllcatedAmount = allocatedAmount;

  let remainingQtyElem = $('.remaining-qty', item);
  let currentQty = parseFloat(remainingQtyElem.text());
  let newQty = currentQty.toFixed(2) - newAllcatedAmount;
  // item.data('qty', newQty.toFixed(2));
  item.setAttribute('data-qty', newQty.toFixed(2));
  remainingQtyElem.text(newQty.toFixed(2));
  if (newQty <= 0) {
      item.classList.add('disabled');
      item.setAttribute('draggabl', false);

      
    }
    return newQty;
  }

  document.querySelectorAll('.kanban-drag').forEach(function (board) {
  board.addEventListener('dragover', function (e) {
      e.preventDefault(); // Allows dropping
  });

  board.addEventListener('drop', function (e) {

  });
  });

  function Handel_item_spilt(e, draggedItem, Holder){
    e.preventDefault();
    var HaveChild = Holder.hasChildNodes();
    if(HaveChild)
      return;

    // if (!draggedItem) {
    //     alert("Error: Can't find the dragged item.");
    //     return;
    // }


    



    let allocatedAmount  = 0;
    let newAmount  = 0;
    
    Handel_model_amount(draggedItem, Holder);

    qty = null;
    // draggedItem = null;
    unit = null;

  }

  function  Handel_model_amount (draggedItem, Holder){
    // let is_parentAside = draggedItem.parentNode.ClassList.contains('Aside');
    let qty = draggedItem.getAttribute('data-qty');
    console.log("test");
    let unit = draggedItem.getAttribute('data-unit');
    let parent         = draggedItem.parentNode
    
    let is_parentAside = parent.classList.contains("Aside");
    console.log(is_parentAside);
    if(is_parentAside){
      var value = 0
      var allocatedAmount = 0;
      confirmationModal = $('#confirmationModal');
      // Show modal for confirmation
        confirmationModal.modal('show');
        confirmationModal.find('#splitAmount').val(qty).attr('max', qty);
        confirmationModal.find('#unitLabel').text(unit);
        document.getElementById('confirmDrop').onclick = function () {
        allocatedAmount = $('#splitAmount').val();
        if (allocatedAmount > 0) {
              Clone = draggedItem.cloneNode(true);
              Clone.setAttribute('data-qty', allocatedAmount);
              Clone.querySelector('.remaining-qty').innerText = allocatedAmount;
              Holder.append(Clone);
              updateRemainingQty(draggedItem, allocatedAmount);
            confirmationModal.modal('hide');
        }else {
            alert('Please enter a valid allocation.');
        }
      }
    }else{
      Holder.append(draggedItem);
    }
  }

// Search Bar Filtering
  $('#search-remaining-items').on('input', function () {
  const query = $(this).val().toLowerCase();
  $('#remaining-items .kanban-item').each(function () {
      const description = $(this).data('description').toLowerCase();
      if (description.includes(query)) {
          $(this).show();
      } else {
          $(this).hide();
      }
  });
  });

  $(document).on('input', '#splitAmount', function () {
  let maxAmount = parseFloat($(this).attr('max'));
  let currentAmount = parseFloat($(this).val());
  if (currentAmount > maxAmount || currentAmount < 0) {
      $(this).val(maxAmount);
      $('#confirmDrop').attr('disabled', true);
  } else {
      $('#confirmDrop').attr('disabled', false);
  }
  });

  // Enable drag for items in remaining positions
  document.querySelectorAll('#remaining-items .kanban-item').forEach(function (item) {
  item.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', item.dataset.eid);
  });
  });