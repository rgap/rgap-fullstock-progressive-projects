import { Button, Container, InputField } from './components/ui'

function App() {
  return (
    <Container>
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h1>Hello, Components!</h1>

        <InputField label="Nombre" placeholder="Tu nombre" />
        <InputField label="Email" type="email" placeholder="tu@email.com" />

        <Button variant="default">Enviar</Button>
      </div>
    </Container>
  )
}

export default App
