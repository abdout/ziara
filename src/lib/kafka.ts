// Simplified Kafka utilities - can be replaced with actual Kafka implementation later
// For now, we'll use in-memory event emitter for development

import { EventEmitter } from 'events'

class MockKafkaProducer {
  private emitter: EventEmitter

  constructor(emitter: EventEmitter) {
    this.emitter = emitter
  }

  async connect() {
    console.log('Mock Kafka Producer connected')
    return Promise.resolve()
  }

  async send(topic: string, message: any) {
    console.log(`Mock Kafka: Sending message to topic ${topic}:`, message)
    this.emitter.emit(topic, message)
    return Promise.resolve()
  }

  async disconnect() {
    console.log('Mock Kafka Producer disconnected')
    return Promise.resolve()
  }
}

class MockKafkaConsumer {
  private emitter: EventEmitter
  private groupId: string

  constructor(emitter: EventEmitter, groupId: string) {
    this.emitter = emitter
    this.groupId = groupId
  }

  async connect() {
    console.log(`Mock Kafka Consumer connected (group: ${this.groupId})`)
    return Promise.resolve()
  }

  async subscribe(topics: string[]) {
    console.log(`Mock Kafka Consumer subscribing to topics:`, topics)
    return Promise.resolve()
  }

  async run(handler: (message: any) => void) {
    console.log('Mock Kafka Consumer running')
    // In a real implementation, this would consume messages
    return Promise.resolve()
  }

  async disconnect() {
    console.log('Mock Kafka Consumer disconnected')
    return Promise.resolve()
  }
}

// Shared event emitter for mock communication
const kafkaEmitter = new EventEmitter()

export function createKafkaClient(clientId: string) {
  console.log(`Creating mock Kafka client: ${clientId}`)
  return { clientId }
}

export function createProducer(client: any) {
  return new MockKafkaProducer(kafkaEmitter)
}

export function createConsumer(client: any, groupId: string) {
  return new MockKafkaConsumer(kafkaEmitter, groupId)
}

export const producer = createProducer({ clientId: 'nextjs-app' })
export const consumer = createConsumer({ clientId: 'nextjs-app' }, 'nextjs-group')