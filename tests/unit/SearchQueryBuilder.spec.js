import { shallowMount } from '@vue/test-utils';
import searchquerybuilder from '@/components/searchquerybuilder';

describe('searchquerybuilder/SearchQueryBuilder.vue', () => {
  it('mounts without errors', () => {
    /*const wrapper =*/
    shallowMount(searchquerybuilder.SearchQueryBuilder, {
      propsData: {
        apply() {}
      }
    });
    expect(1).toBe(1);
  });
});
