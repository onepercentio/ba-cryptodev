require('@nomicfoundation/hardhat-toolbox')
const { expect } = require('chai')

describe('The greetings contract', function () {

  let deployer
  let greeter

  beforeEach(async () => {
    [deployer] = await ethers.getSigners()

    const Factory = await ethers.getContractFactory('Greeter')
    const factory = await Factory.deploy()

    greeter = await factory.deployed()
  })

  describe('when calling the greeter fn', () => {

    it('should correctly return a generic greeting', async () => {
      const greetings = await greeter.greet()

      expect(greetings).to.eql('Hello, human!')
    })

    it('should correctly greet me', async () => {
      const myName = 'CHUCK NORRIS'
      const greetings = await greeter.greet()

      expect(greetings).to.eql(`Hello, ${myName}!`)
    })

    it('should allow me to update the greeting string')

    it('should allow me to update the subject name only')

    it('should fail if update is called by an unauthorized account')

    it('should greet anyone in a decentralized way')

  })

});
