import Image from 'next/image'

function Home() {
    return (
        <Image
            loading='eager'
            src="/images/pablofrases.png"
            width={1000}
            height={1000}
            alt="plablo_frases"
        />
    )
}

export default Home
