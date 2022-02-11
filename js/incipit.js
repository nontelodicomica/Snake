document.addEventListener('DOMContentLoaded',function(){

    function begin(){
        document.body.setAttribute('class','body_beforestart'); 
        setTimeout(appendProducer,3000);
    }
    
    function appendProducer(){
        var content = document.getElementById('logo_content');
        var producer = document.createElement('p');
            producer.innerText = 'Produced by Santoianni Alessia';
            producer.setAttribute('id','producer_attribute');
        content.appendChild(producer);   
        setTimeout(openloginscreen,2000); 
    }

    function openloginscreen(){
        var content = document.getElementById('logo_content');
            document.body.removeChild(content);
            document.body.setAttribute('class','body_afterstart');
            document.body.appendChild(appendBoxRegistration());
    };

    begin();
});