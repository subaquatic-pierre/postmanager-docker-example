import { render, screen } from '@testing-library/react';
import Page from 'components/Page';

describe('Test main Page', () => {
  it('Renders without error', () => {
    render(
      <Page>
        <div>Children</div>
      </Page>,
    );

    expect(screen.getByText(/Children/i)).toBeInTheDocument();
  });

  it('Displays at minimum height', () => {
    render(
      <Page>
        <div>Children</div>
      </Page>,
    );

    expect(screen.getByTestId(/page-container/i)).toHaveStyle(
      'min-height:calc(100vh - 144px)',
    );
  });
});
