let content_map = {};
fetch('../assets/content_mapping.json').then(response => response.json())
    .then(json => content_map = json);
var pdfUrl = '../assets/pdfs/01  Science of Governance PDF for Website.pdf'
var pdf_on = false
let menu_on = false
let dropDownOn = false
window.onload = () => {

    //For Sections: 
    const side_sections = document.querySelectorAll('[side-section]');

    for (let i = 0; i < side_sections.length; i++) {
        const side_section = side_sections[i];
        const section_id_js = side_section.dataset.id;
        const data = side_section.innerHTML

        side_section.addEventListener('click', () => {
            current_selected = document.querySelector('.selected_section')
            if (current_selected) {
                current_selected.classList.remove('selected_section')
            }
            side_section.classList.add('selected_section');

            //remove selected class from nav Items
            const selected_nav = document.querySelector('.selected_item')
            if (selected_nav) {
                selected_nav.classList.remove('selected_item')
            }
            SwitchPage(data);
        });
    }

    // For Mobile Dropdown 
    const mobile_side_sections = document.querySelectorAll('[side-section-mobile]');
    ///New Line
    const menu_div = document.querySelector('.menu')
    for (let i = 0; i < mobile_side_sections.length; i++) {
        const data = mobile_side_sections[i].innerHTML

        mobile_side_sections[i].addEventListener('click', () => {
            console.log(data)

            current_selected = document.querySelector('.selected_section')
            const selected_mobile_section = document.querySelector('.dropdown_button')
            selected_mobile_section.innerHTML = data.toUpperCase() + '<span class="fas fa-caret-down"></span>'
            menu_div.style.display = 'none'
            SwitchPage(data);
        });
    }


    // For Mobile Item nav 
    const mobile_nav_item = document.querySelectorAll('[nav-item-mobile]');
    ///New Line
    const side_nav_div = document.querySelector('.mobile-side-nav')
    for (let i = 0; i < mobile_nav_item.length; i++) {
        const data = mobile_nav_item[i].innerHTML

        mobile_nav_item[i].addEventListener('click', () => {
            document.querySelector('.active').classList.remove('active')

            mobile_nav_item[i].classList.add("active")
            side_nav_div.style.left = '-100%'
            document.querySelector('.menu_icon').classList.add("fa-bars");
            document.querySelector('.menu_icon').innerHTML=''
            document.querySelector('body').style.overflow = 'scroll';
            document.querySelector(".check_box").checked = false
            SwitchPage(data);
        });
    }



    //For nav Items: 
    const nav_items = document.querySelectorAll('[nav-item]');

    for (let i = 0; i < nav_items.length; i++) {
        const side_section = nav_items[i];
        const section_id_js = side_section.dataset.id;
        const data = side_section.innerHTML

        side_section.addEventListener('click', () => {
            if (section_id_js < 8 && section_id_js > 1) {
                current_selected = document.querySelector('.selected_item')
                if (current_selected) {
                    current_selected.classList.remove('selected_item')
                }
                side_section.classList.add('selected_item');

                //remove selected class from sections
                const selected_sec = document.querySelector('.selected_section')
                if (selected_sec) {
                    selected_sec.classList.remove('selected_section')
                }
                SwitchPage(data)
            }
        });
    }
}

function SwitchPage(tag) {
    tag = tag.trim().toLowerCase()
    const data = content_map[tag]

    //setting backgroundImg
    let imgUrl = "assets/bg_images/"+data.imgID+".png"
    document.querySelector('#hero_item2').style.backgroundImage = 'url('+imgUrl+')'

    //setting main content
    const content_div = document.querySelector(".hero_content_innterContent_text")
    content_div.innerHTML = data.main_containt

    //setting title
    const title_div = document.querySelector("#flex_center_heading")
    title_div.innerHTML = data.title
    pdfUrl = data.pdf_url

    //Hide View Pdf Button
    if (!data.isPDF ) {
        document.querySelector(".view_pdf_button").style.display = 'none'    
    }
    else {
        document.querySelector(".view_pdf_button").style.display = 'block'
        document.querySelector(".view_pdf_button").innerHTML = '<a target="_blank" href="'+pdfUrl+'"><img id="pdf_icon" src="assets/Vector.svg" alt=""> View PDF</a>'
    }

}



function toggle_pdf_view() {
    if (pdf_on) {
        const viewer = document.querySelector('.pdf_viwer')
        viewer.style.top = '-100%'
        pdf_on = false
    } else {
        const viewer = document.querySelector('.pdf_viwer')
        viewer.style.top = '0px'
        pdf_on = true
    }

}


// Mobile menu scroll off 
function disableScroll() {
    let menu_iocn = document.querySelector('.menu_icon')
    if (!document.querySelector(".check_box").checked) {
        document.body.style.overflow = 'hidden';
        menu_on = true
        document.querySelector(".mobile-side-nav").style.left='0px'
        document.querySelector(".check_box").value = 'off'
        menu_iocn.classList.remove('fa-bars')
        document.querySelector('.menu').style.display = 'none'
        menu_iocn.innerHTML = 'X'
    } else {
        document.body.style.overflow = 'scroll';
        menu_on = false
        menu_iocn.classList.add('fa-bars')
        document.querySelector(".check_box").value = 'on'
        menu_iocn.innerHTML = ''
        document.querySelector(".mobile-side-nav").style.left='-100%'
    }
}


//New Lines
// For Showing Dropdown
function showDropdown() {
    if(dropDownOn){
    document.querySelector('.menu').style.display = 'none'
    dropDownOn = false
        
    }
    else{
    document.querySelector('.menu').style.display = 'block'
    dropDownOn = true
    }
}
