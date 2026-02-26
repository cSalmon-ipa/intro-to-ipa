// these are what will be used on your pages, such as a data table or custom buttons etc..

type Props = {
	readonly content: string;
};

export const TemplateComponent = ({ content }: Props) => (
	<div data-testid='test' id='test'>
		<p>{content}</p>
	</div>
);
