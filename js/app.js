$(document).ready(function() {
  $('#example').DataTable( {
      responsive: true,
      lengthChange: false,
      data: dataSet,
      searching: false,
      paging: true,
      ordering: true,
      info: false,
      pageLength: 8,
      order: [[8, "desc"]],
      initComplete: function(settings, json) {
        document.getElementById('countTotal').innerHTML = $('#example').DataTable().column( 3 ).data().count()
        document.getElementById('countPassed').innerHTML = $('#example').DataTable().column( 3 ).data().filter( function ( value, index ) {return value === "Passed" ? true : false;}).count()
        document.getElementById('countErrors').innerHTML = $('#example').DataTable().column( 3 ).data().filter( function ( value, index ) {return value === "Failed" ? true : false;}).count()
      },
      columns: [
        {
          data: "ID",
          width: "1rem",
          searchable: false,
          sortable: false,
          visible: true,
          className: "text-center",
          render: function ( data, type, row ) {
              if (type === 'display') {
                  return '<label class="checkbox-label"><input type="checkbox" onclick="checkboxClick(this)"><span class="checkbox-custom rectangular"></span></label>';
              }
              return data;
          }
      },
        {
          data: "ID",
          width: "3%", 
          render: function ( data, type, row ) {
            if (type === 'display') {
                return '<span class="arv-id">' + data + '</span>';
            }
            return data;
        }
          
      },
        {
          data: "Test Case Name",
          width: "30%"
        },
        {
          data: "Status",
          render: function ( data, type, row ) {
            if (type === 'display') {
                if (data == "Passed") {
                  return '<b class="status success">' + data + '</b>';
                }
                else{
                  return '<b class="status failed">' + data + '</b>';
                }
            }
            return data;
          }
        },
        {
          data: "Module",
          width: "15%"
        },
        {
          data: "System",
          width: "6rem",
          render: function ( data, type, row ) {
            if (type === 'display') {
                return '<i class="far fa-hdd ikona"></i>' + '<span>' + data + '</span>';
            }
            return data;
        }
        },
        {
          data: "Client",
          width: "1%"
        },
        {data: "Execution Start" },
        {data: "Execution End" },
        {
          data: "Output",
          width: "7%",
          render: function ( data, type, row ) {
            if (type === 'display') {
              switch(row.OutputType) {
                case "Sales Order":
                  return '<i class="fas fa-file-alt output-type so"></i>' + data;
                  break;
                case "Transfer Order":
                  return '<i class="fas fa-file-alt output-type to"></i>' + data;
                  break;
                case "Material Document":
                  return '<i class="fas fa-file-alt output-type md"></i>' + data;
                  break;
                default:
                  return '<i class="fas fa-file-alt output-type"></i>' + data;
              } 
            }
            return data;
        }
        }
      ]
  } );/* DATATABLES END */



} );

function checkboxClick(element){
  element.closest("tr").classList.toggle("clicked")
}

function ReloadData(){
  var oTable = $('#example').dataTable();
  oTable.fnClearTable();
/*   oTable.fnAddData(dataSet); */

  window.location.reload(true);
}