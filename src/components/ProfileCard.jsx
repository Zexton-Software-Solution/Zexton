import './ProfileCard.css';

export default function ProfileCard({
  name,
  title,
  handle,
  status = 'Profile pending',
  avatarUrl,
  contactText = 'Contact',
  onContactClick
}) {
  return (
    <article className="profile-card-wrap">
      <div className="profile-card">
        <img
          className="profile-card__avatar"
          src={avatarUrl}
          alt={`${name} profile`}
        />
        <div className="profile-card__heading">
          <h3>{name}</h3>
          <p>{title}</p>
        </div>
        <div className="profile-card__bar">
          <div>
            <strong>@{handle}</strong>
            <span>{status}</span>
          </div>
          <button type="button" onClick={onContactClick}>{contactText}</button>
        </div>
      </div>
    </article>
  );
}
