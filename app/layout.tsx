import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import '@aws-amplify/ui-react/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ConfigureAmplifyClientSide />
      <body>{children}</body>
    </html>
  )
}
