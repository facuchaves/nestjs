import { BadRequestException } from '@nestjs/common';
import { FilterPipe } from '../../src/pipes/filter.pipe';

describe('Filter pipe', () => {
  const filterPipe: FilterPipe = new FilterPipe();
  describe('Happy paths', () => {
    it(`adult filter`, async () => {
      const adultFilter = {
        minAge: 18,
        maxAge: 21,
      };

      const adultFilterTransformed = filterPipe.transform(adultFilter);

      expect(adultFilterTransformed).toEqual({
        ...adultFilter,
        isAdult: true,
      });
    });

    it(`child filter`, async () => {
      const childFilter = {
        minAge: 17,
        maxAge: 21,
      };

      const childFilterTransformed = filterPipe.transform(childFilter);

      expect(childFilterTransformed).toEqual({
        ...childFilter,
        isAdult: false,
      });
    });
  });

  describe('Error paths', () => {
    it(`min age greater than max age`, async () => {
      const adultFilter = {
        minAge: 22,
        maxAge: 21,
      };

      expect(() => filterPipe.transform(adultFilter)).toThrow(
        'Max age must be greater than min age.',
      );
    });
  });
});
