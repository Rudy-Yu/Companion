import React from 'react'
import PlayfulButton from '../components/PlayfulButton'
import PlayfulCard from '../components/PlayfulCard'
import PlayfulBadge from '../components/PlayfulBadge'
import PlayfulAvatar from '../components/PlayfulAvatar'
import PlayfulInput from '../components/PlayfulInput'
import PlayfulSelect from '../components/PlayfulSelect'
import PlayfulCheckbox from '../components/PlayfulCheckbox'
import PlayfulRadio from '../components/PlayfulRadio'
import PlayfulModal from '../components/PlayfulModal'
import PlayfulToast from '../components/PlayfulToast'
import PlayfulHeader from '../components/PlayfulHeader'
import PlayfulFooter from '../components/PlayfulFooter'
import PlayfulTextarea from '../components/PlayfulTextarea'

const Playground = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Playful Components Playground</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulButton</h2>
        <div className="flex space-x-2">
          <PlayfulButton variant="primary">Primary Button</PlayfulButton>
          <PlayfulButton variant="secondary">Secondary Button</PlayfulButton>
          <PlayfulButton variant="success">Success Button</PlayfulButton>
          <PlayfulButton variant="danger">Danger Button</PlayfulButton>
          <PlayfulButton variant="warning">Warning Button</PlayfulButton>
          <PlayfulButton variant="info">Info Button</PlayfulButton>
          <PlayfulButton variant="light">Light Button</PlayfulButton>
          <PlayfulButton variant="dark">Dark Button</PlayfulButton>
          <PlayfulButton variant="outline">Outline Button</PlayfulButton>
          <PlayfulButton variant="ghost">Ghost Button</PlayfulButton>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulCard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PlayfulCard
            title="Card Title"
            description="This is a sample card description."
            image="https://via.placeholder.com/300"
            price={50}
            rating={4.5}
            location="New York"
            tags={['Tag 1', 'Tag 2']}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulBadge</h2>
        <div className="flex space-x-2">
          <PlayfulBadge variant="default">Default Badge</PlayfulBadge>
          <PlayfulBadge variant="primary">Primary Badge</PlayfulBadge>
          <PlayfulBadge variant="success">Success Badge</PlayfulBadge>
          <PlayfulBadge variant="warning">Warning Badge</PlayfulBadge>
          <PlayfulBadge variant="danger">Danger Badge</PlayfulBadge>
          <PlayfulBadge variant="info">Info Badge</PlayfulBadge>
          <PlayfulBadge variant="light">Light Badge</PlayfulBadge>
          <PlayfulBadge variant="dark">Dark Badge</PlayfulBadge>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulAvatar</h2>
        <div className="flex space-x-2">
          <PlayfulAvatar src="https://via.placeholder.com/40" alt="Avatar" size="sm" status="online" />
          <PlayfulAvatar src="https://via.placeholder.com/40" alt="Avatar" size="md" status="offline" />
          <PlayfulAvatar src="https://via.placeholder.com/40" alt="Avatar" size="lg" status="busy" />
          <PlayfulAvatar src="https://via.placeholder.com/40" alt="Avatar" size="xl" status="away" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulInput</h2>
        <div className="flex flex-col space-y-2">
          <PlayfulInput label="Default Input" placeholder="Enter text..." />
          <PlayfulInput label="Error Input" error="This field is required" placeholder="Enter text..." />
          <PlayfulInput label="Disabled Input" disabled placeholder="Disabled input" />
          <PlayfulInput label="Required Input" required placeholder="Required input" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulSelect</h2>
        <div className="flex flex-col space-y-2">
          <PlayfulSelect
            label="Default Select"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
          />
          <PlayfulSelect
            label="Error Select"
            error="This field is required"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
          />
          <PlayfulSelect
            label="Disabled Select"
            disabled
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
          />
          <PlayfulSelect
            label="Required Select"
            required
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulCheckbox</h2>
        <div className="flex flex-col space-y-2">
          <PlayfulCheckbox label="Default Checkbox" />
          <PlayfulCheckbox label="Error Checkbox" error="This field is required" />
          <PlayfulCheckbox label="Disabled Checkbox" disabled />
          <PlayfulCheckbox label="Required Checkbox" required />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulRadio</h2>
        <div className="flex flex-col space-y-2">
          <PlayfulRadio label="Default Radio" name="radio" />
          <PlayfulRadio label="Error Radio" error="This field is required" name="radio" />
          <PlayfulRadio label="Disabled Radio" disabled name="radio" />
          <PlayfulRadio label="Required Radio" required name="radio" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulModal</h2>
        <PlayfulButton onClick={() => setShowModal(true)}>Open Modal</PlayfulButton>
        <PlayfulModal isOpen={showModal} onClose={() => setShowModal(false)} title="Modal Title">
          <p>This is a sample modal content.</p>
        </PlayfulModal>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulToast</h2>
        <PlayfulButton onClick={() => setShowToast(true)}>Show Toast</PlayfulButton>
        {showToast && (
          <PlayfulToast
            message="This is a sample toast message."
            type="info"
            duration={5000}
            onClose={() => setShowToast(false)}
          />
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulHeader</h2>
        <PlayfulHeader />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulFooter</h2>
        <PlayfulFooter />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">PlayfulTextarea</h2>
        <div className="flex flex-col space-y-2">
          <PlayfulTextarea label="Default Textarea" placeholder="Enter text..." />
          <PlayfulTextarea label="Error Textarea" error="This field is required" placeholder="Enter text..." />
          <PlayfulTextarea label="Disabled Textarea" disabled placeholder="Disabled textarea" />
          <PlayfulTextarea label="Required Textarea" required placeholder="Required textarea" />
        </div>
      </section>
    </div>
  )
}

export default Playground 