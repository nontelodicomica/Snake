    function begin(){
        alert("Attenzione: selezionare solo all'effettivo utilizzo della pagina! Vuoi visualizzarne il contenuto?");
        setTimeout(appendProducer,3000);
    }

    function appendProducer(){
        let content = document.getElementById('logo_content');
        let producer = document.createElement('p');
            producer.innerText = 'Produced by Santoianni Alessia';
            producer.setAttribute('id','producer_attribute');
        content.appendChild(producer);   
        setTimeout(function(){
            window.location.replace('./php/loginform.php');
        },2000); 
    }
    
    begin();