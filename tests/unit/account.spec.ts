import { shallowMount } from '@vue/test-utils'
import Account from '@/views/Account.vue'

describe('Account', () => {
  it('Account views exists', () => {
      const wrapper = shallowMount(Account);
      expect(wrapper.text()).toMatch('My profile')
  })
})
