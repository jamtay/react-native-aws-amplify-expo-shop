import {useSelector} from 'react-redux';
import {useItems} from '../itemsHook';
import {ITEM_TYPES} from '../constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockAppState = {
  availableItemsData: {
    availableItems: [
      {
        id: 'available id',
      },
    ],
    loading: false,
  },
  missingItemsData: {
    missingItems: [
      {
        id: 'missing id',
      },
    ],
    loading: true,
  },
};

describe('useItems() hook', () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback(mockAppState);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return missing items with loading information for missing item type', () => {
    const [items, loading] = useItems(ITEM_TYPES.MISSING);
    expect(items).toEqual(mockAppState.missingItemsData.missingItems);
    expect(loading).toEqual(mockAppState.missingItemsData.loading);
  });

  it('should return available items with loading information for available items type', () => {
    const [items, loading] = useItems(ITEM_TYPES.AVAILABLE);
    expect(items).toEqual(mockAppState.availableItemsData.availableItems);
    expect(loading).toEqual(mockAppState.availableItemsData.loading);
  });

  it('should return undefined for none available or missing items type', () => {
    const response = useItems('SOME OTHER TYPE');
    expect(response).toBeUndefined();
  });
});
