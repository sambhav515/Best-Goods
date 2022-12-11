var serverURL="http://localhost:3000";


function fillCategory(){
    $.getJSON(`${serverURL}/product/fetch_all_categories`,function(data){
        //alert(JSON.stringify(data))
        data.category.map((item)=>{
            $('#categoryid').append($('<option>').text(item.categoryname).val(item.categoryid));
        });
        $("#categoryid").formSelect();
    });
}

function fillSubcategory(cid,selected){
   
        $.getJSON(`${serverURL}/product/fetch_all_subcategories`,{'categoryid':cid},function(data){
            //alert(JSON.stringify(data))
            $('#subcategoryid').empty()
            $('#subcategoryid').append($('<option>').text('Choose Sub Category'));
            

            data.subcategory.map((item)=>{
                $('#subcategoryid').append($('<option>').text(item.subcategoryname).val(item.subcategoryid));
            });
            if(selected!='')
            $('#subcategoryid').val(selected)
            $("#subcategoryid").formSelect();
        })
}

function fillBrand(cid,selected){
    $.getJSON(`${serverURL}/product/fetch_all_brands`,{'categoryid':$('#categoryid').val()},function(data){
        //alert(JSON.stringify(data))
        $('#brandid').empty()
        $('#brandid').append($('<option>').text('Choose Brand'));
        

        data.brand.map((item)=>{
            $('#brandid').append($('<option>').text(item.brandname).val(item.brandid));
        });
        if(selected!='')
        $('#brandid').val(selected)
        $("#brandid").formSelect();
    });
}

$(document).ready(function(){

     fillCategory()
     
     $("#categoryid").change(function(){
        fillSubcategory($('#categoryid').val(),'')
        fillBrand($('#categoryid').val(),'')
     })

        
    })