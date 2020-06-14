import {
  getTableCardStyle,
  verticalTableCardStyle,
  horizontalTableCardStyle,
  genericTableCardStyle,
} from '../table';

describe('getTableCardStyle styling util', () => {
  it('should return the vertical styling when horizontal is false', () => {
    const actualStyle = getTableCardStyle(false, 2);
    expect(actualStyle).toEqual(verticalTableCardStyle);
  });

  it('should return the vertical styling when horizontal is undefined', () => {
    const actualStyle = getTableCardStyle(undefined, 2);
    expect(actualStyle).toEqual(verticalTableCardStyle);
  });

  it('should return the generic styling when horizontal is true but dataLength is 0', () => {
    const actualStyle = getTableCardStyle(true, 0);
    expect(actualStyle).toEqual(genericTableCardStyle);
  });

  it('should return the generic styling when horizontal is true but dataLength is 1', () => {
    const actualStyle = getTableCardStyle(true, 1);
    expect(actualStyle).toEqual(genericTableCardStyle);
  });

  it('should return the horizontal styling when horizontal is true but dataLength is more than 1', () => {
    const actualStyle = getTableCardStyle(true, 2);
    expect(actualStyle).toEqual(horizontalTableCardStyle);
  });
});
