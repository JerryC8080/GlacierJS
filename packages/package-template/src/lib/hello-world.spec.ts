import hello from './hello-world';

describe('HelloWorld', () => {
  const mockHello = jest.fn(hello);

  test('should work', () => {
    mockHello('jerry');
    expect(mockHello.mock.calls[0][0]).toBe('jerry');
  });
});
