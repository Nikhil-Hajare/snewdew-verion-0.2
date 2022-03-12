let content_map = {};
fetch('../assets/content_mapping.json').then(response => response.json())
    .then(json => content_map = json);
var pdfUrl = '../paper.pdf'
var pdf_on = false
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
                console.log("Remove Nav Item Selector " + selected_nav.innerHTML)
            }
            SwitchPage(data);
        });
    }



    //For nav Items: 
    const nav_items = document.querySelectorAll('[nav-item]');

    for (let i = 0; i < nav_items.length; i++) {
        const side_section = nav_items[i];
        const section_id_js = side_section.dataset.id;
        const data = side_section.innerHTML
        console.log(section_id_js, side_section)

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
                    console.log("Remove Nav Item Selector " + selected_sec.innerHTML)
                }
                SwitchPage(data)
            }
        });
    }
}

function SwitchPage(tag) {
    tag = tag.trim().toLowerCase()
    const data = content_map[tag]
    console.log(tag, data)

    //setting main content
    const content_div = document.querySelector(".hero_content_innterContent_text")
    content_div.innerHTML = data.main_containt

    //setting title
    const title_div = document.querySelector("#flex_center_heading")
    title_div.innerHTML = data.title
    pdfUrl = data.pdf_url

    //Hide View Pdf Button
    if (!data.isPDF) {
        document.querySelector(".view_pdf_button").style.display = 'none'
    }
    else {
        document.querySelector(".view_pdf_button").style.display = 'block'
    }
    load_doc()

}



//PDF Script===================================================================================================================================================================================================================

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.5,
    canvas = document.querySelector('#pdfRederer'),
    ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
    pageIsRendering = true;

    // Get page
    pdfDoc.getPage(num).then(page => {
        // Set scale
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        // Output current page
        document.querySelector('#current_page').textContent = num;
    });
};

// Check for pages rendering
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Show Prev Page
const showPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
};

// Get Document
function load_doc() {
    pdfjsLib
        .getDocument(pdfUrl)
        .promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;

            document.querySelector('#total_pages').textContent = pdfDoc.numPages;

            renderPage(pageNum);
        })
        .catch(err => {
            // Display error
            const div = document.createElement('div');
            div.className = 'error';
            div.appendChild(document.createTextNode(err.message));
            document.querySelector('body').insertBefore(div, canvas);
            // Remove top bar
            // document.querySelector('.top-bar').style.display = 'none';
        });
}
// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);


//
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