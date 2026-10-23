import clsx from 'clsx'

/** Page-width container with consistent gutters. */
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={clsx('kbs-container', className)} {...rest}>
      {children}
    </Tag>
  )
}
