const s = (elm) => document.querySelector(elm)

try {
  const catResonse = await fetch('https://api.thecatapi.com/v1/breeds')
  const catData = await catResonse.json()
  catData.map((cat) => {
    s(
      '#cat-name'
    ).innerHTML += `<option class="bg-zinc-800 text-zinc-50" value="${cat.id}">${cat.name}</option>`
  })

  s('#cat-name').addEventListener('change', async (e) => {
    ;[s('#cat-image'), s('#cat-description'), s('#cat-temprament')].forEach(
      (e) => (e.innerHTML = '')
    )

    s('#cat-image').scrollLeft = 0

    if (e.target.value === 'start') {
      s('#cat-img-nav').classList.add('hidden')
      s('#cat-img-nav').classList.remove('flex')

      s('#cat-gemul').classList.remove('hidden')
      return
    } else {
      s('#cat-img-nav').classList.remove('hidden')
      s('#cat-img-nav').classList.add('flex')

      s('#cat-gemul').classList.add('hidden')
    }

    const catId = e.target.value
    const catImgResonse = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${catId}`
    )
    const catImgData = await catImgResonse.json()

    catImgData.map((catImg) => {
      s(
        '#cat-image'
      ).innerHTML += `<img class="shrink-0 w-full h-full object-cover" src="${catImg.url}" alt="${catImg.id}">`
    })

    s('#cat-description').innerHTML = `
      <h1 class="text-4xl font-semibold mb-2">${
        catData.find((cat) => cat.id === catId).name
      }</h1>
      <p class="p-1">${catData.find((cat) => cat.id === catId).description}</p>
    `

    s('#cat-temprament').innerHTML = `
      <p class="p-1 font-semibold">--</p>
      <p class="italic text-xl">Temperament :</p>
      <p class="p-1 font-semibold">${
        catData.find((cat) => cat.id === catId).temperament
      }</p> `

    s('#previous-cat-img').classList.add('cursor-not-allowed')
    s('#next-cat-img').classList.remove('cursor-not-allowed')
  })
} catch (error) {
  console.log(error)
}

s('#cat-image').addEventListener('scroll', () => {
  if (s('#cat-image').scrollLeft === 0) {
    s('#previous-cat-img').classList.add('cursor-not-allowed')
  } else {
    s('#previous-cat-img').classList.remove('cursor-not-allowed')
  }
  if (
    s('#cat-image').scrollLeft ===
    s('#cat-image').scrollWidth - s('#cat-image').clientWidth
  ) {
    s('#next-cat-img').classList.add('cursor-not-allowed')
  } else {
    s('#next-cat-img').classList.remove('cursor-not-allowed')
  }
})

s('#next-cat-img').addEventListener('click', () => {
  s('#cat-image').scrollLeft += 320
})

s('#previous-cat-img').addEventListener('click', () => {
  s('#cat-image').scrollLeft -= 320
})