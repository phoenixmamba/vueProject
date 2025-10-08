import { ref } from 'vue'
import axios from 'axios'

export default function useDog() {
  const dogList = ref(['https://images.dog.ceo/breeds/terrier-boston/bostonTerrier_000002.jpg'])

  async function anotherDog() {
    try {
      const result = await axios.get('https://dog.ceo/api/breeds/image/random')
      console.log(result.data)
      dogList.value.push(result.data.message)
    } catch (err) {
      alert(err)
    }
  }

  return { dogList, anotherDog }
}
