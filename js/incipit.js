    function begin(){
        let modal = document.getElementById('modal_incipit');
            document.body.removeChild(modal);
        document.getElementById('logo_container').hidden = false;
        setTimeout(appendProducer,3000);
    }

    function appendProducer(){
        let container = document.getElementById('logo_container');
        let producer = document.createElement('p');
            producer.innerText = 'Produced by Santoianni Alessia';
            producer.setAttribute('id','producer_attribute');
        container.appendChild(producer);   
        setTimeout(function(){
            window.location.replace('./php/loginform.php');
        },2000); 
    }