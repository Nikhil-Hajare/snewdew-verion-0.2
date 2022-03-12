window.onload = () => {

    //For Sections: 
    const side_sections = document.querySelectorAll('[side-section]');

    for (let i = 0; i < side_sections.length; i++) {
        const side_section = side_sections[i];
        const section_id_js = side_section.dataset.id;

        side_section.addEventListener('click', () => {
            current_selected = document.querySelector('.selected_section')
            current_selected.classList.remove('selected_section')
            side_section.classList.add('selected_section');

            // SwitchPage(page_id);
        });
    }



    //For Items: 
    const nav_items = document.querySelectorAll('[nav-item]');

    for (let i = 0; i < nav_items.length; i++) {
        const side_section = nav_items[i];
        const section_id_js = side_section.dataset.id;
        console.log(section_id_js, side_section)

        side_section.addEventListener('click', () => {
            if (section_id_js<8 && section_id_js>1) {
                current_selected = document.querySelector('.selected_item')
                current_selected.classList.remove('selected_item')
                side_section.classList.add('selected_item');

                // SwitchPage(page_id);
            }
        });
    }
}

// Mobile menu scroll off 
let menu_on = false
function disableScroll() {
  if (!menu_on) {
   document.body.style.overflow = 'hidden';
   menu_on = true
   console.log("false")
  } else {
   document.body.style.overflow = 'scroll';
   menu_on = false
   console.log("true")
  }
 }