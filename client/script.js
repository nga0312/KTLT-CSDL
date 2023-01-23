const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const iconCloseModal = document.querySelector(".modal__header i");
const buttonCloseModal = document.querySelector(".modal__footer button");

function toggleModal() {
  modal.classList.toggle("hide");
}

openModalBtn.addEventListener("click", toggleModal);
iconCloseModal.addEventListener("click", toggleModal);
buttonCloseModal.addEventListener("click", toggleModal);

modal.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) toggleModal();
});

//img
const inputImg = document.querySelector('#input-img')

inputImg.addEventListener('change', (e) => {
    let file = e.target.files[0]

    if (!file) return

    let img = document.createElement('img')
    img.src = URL.createObjectURL(file)

    document.querySelector('.preview').appendChild(img)
    console.log('img',img)
})
