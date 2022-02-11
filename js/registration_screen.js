    function appendUsername(){
        var username_wrapper = document.createElement('div');
            username_wrapper.setAttribute('id','username_wrapper');
            username_wrapper.setAttribute('class','wrapper');
        
        var p =document.createElement('p');
            p.innerText = "Username: ";
            p.setAttribute('class','default_style_font');
        username_wrapper.appendChild(p);

        var username = document.createElement('input');
            username.setAttribute('id','username');
            username.setAttribute('class','default_style_font');
            username.setAttribute('type','text');
            username.setAttribute('placeholder','username');
            username.setAttribute('required','');
        username_wrapper.appendChild(username);
        return username_wrapper;
    }

    function appendPassword(){
        var password_wrapper = document.createElement('div');
            password_wrapper.setAttribute('id','password_wrapper');
            password_wrapper.setAttribute('class','wrapper');
        
        var p =document.createElement('p');
            p.innerText = "Password: ";
            p.setAttribute('class','default_style_font');
        password_wrapper.appendChild(p);

        var password = document.createElement('input');
            password.setAttribute('id','password');
            password.setAttribute('class','default_style_font');
            password.setAttribute('type','password');
            password.setAttribute('placeholder','password');
            password.setAttribute('required','');
        password_wrapper.appendChild(password);
        return password_wrapper;
    }

    function appendLoginButton(){
        var login = document.createElement('input');    
            login.setAttribute('id','login_button');
            login.setAttribute('class','default_style_font');
            login.setAttribute('type','submit');
            login.setAttribute('value','LOGIN');
        return login;
    }

    function appendLinkRegistration(){    
        var hyperlink_Registration_wrapper = document.createElement('div');
            hyperlink_Registration_wrapper.setAttribute('class','wrapper');
            hyperlink_Registration_wrapper.setAttribute('id','hyperlink_Registration_wrapper');
            hyperlink_Registration_wrapper.style.textAlign = "center";

            var p = document.createElement('p');
                p.innerText = "User for the first time? ";
                p.setAttribute('id','')
            hyperlink_Registration_wrapper.appendChild(p);

        var registration_text = document.createElement('a');
            registration_text.setAttribute('class','default_style_font');
            registration_text.setAttribute('href','registration.html');
            registration_text.innerText = "  Click to register!";
            hyperlink_Registration_wrapper.appendChild(registration_text);
        return hyperlink_Registration_wrapper;
    }

    function appendFormRegistration(){
        var form_box = document.createElement('form');
            form_box.setAttribute("id","loginform");
            form_box.setAttribute("method","get");
            form_box.setAttribute("action","game.html");
            form_box.appendChild(appendUsername());
            form_box.appendChild(appendPassword());
            form_box.appendChild(appendLoginButton());
        return form_box;
    }

    function appendBoxRegistration(){
        var box_wrapper = document.createElement('div');
            box_wrapper.setAttribute('id','box_wrapper');

        var box_registration = document.createElement('div');
            box_registration.setAttribute('id','box_registration');
        box_wrapper.appendChild(box_registration);

        var box_content = document.createElement('div');
            box_content.setAttribute('id','box_content');
            box_content.appendChild(appendLogoGame());
            box_content.appendChild(appendFormRegistration());
            box_content.appendChild(appendLinkRegistration());
        box_registration.appendChild(box_content);
        return box_wrapper;
    }

    function appendLogoGame(){
        var img_wrapper = document.createElement('div');
            img_wrapper.setAttribute('id','img_wrapper');
        return img_wrapper;
    }