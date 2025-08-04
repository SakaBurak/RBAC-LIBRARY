import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import { useUpdateUserMutation } from '../../store/api/usersApi';
import { selectCurrentUser, selectIsAuthenticated, updateUser, selectIsAuthLoaded } from '../../store/slices/authSlice';
import { useGetRolesQuery } from '../../store/api/usersApi';
import { useChangePasswordMutation } from '../../store/api/authApi';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [form, setForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    mevcut_sifre: '',
    yeni_sifre: '',
    yeni_sifre_tekrar: ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthLoaded = useSelector(selectIsAuthLoaded);
  
  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changePasswordMutation, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const { data: roles = [], isLoading: rolesLoading } = useGetRolesQuery();

  useEffect(() => {
    if (currentUser) {
      console.log('Profile Component - Initializing form with currentUser data:', currentUser);
      setForm({
        ad: currentUser.ad || '',
        soyad: currentUser.soyad || '',
        email: currentUser.email || '',
        telefon: currentUser.telefon || '',
        tc: currentUser.tc || '',
        rol_adi: currentUser.ana_rol_adi || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    if (error) {
      setError("");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.yeni_sifre !== passwordForm.yeni_sifre_tekrar) {
      setError("Yeni şifreler eşleşmiyor.");
      return;
    }

    if (passwordForm.yeni_sifre.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (passwordForm.mevcut_sifre === passwordForm.yeni_sifre) {
      setError("Yeni şifre mevcut şifre ile aynı olamaz.");
      return;
    }

    try {
      await changePasswordMutation({
        kullanici_id: currentUser.kullanici_id,
        mevcut_sifre: passwordForm.mevcut_sifre,
        yeni_sifre: passwordForm.yeni_sifre
      }).unwrap();

      setPasswordChangeMode(false);
      setPasswordForm({
        mevcut_sifre: '',
        yeni_sifre: '',
        yeni_sifre_tekrar: ''
      });
      setSuccess("Şifreniz başarıyla değiştirildi!");
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Şifre değiştirme başarısız');
    }
  };

  const handlePasswordCancel = () => {
    setPasswordChangeMode(false);
    setPasswordForm({
      mevcut_sifre: '',
      yeni_sifre: '',
      yeni_sifre_tekrar: ''
    });
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!form.ad.trim() || !form.soyad.trim() || !form.email.trim()) {
      setError("Ad, soyad ve e-posta alanları zorunludur.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Geçerli bir e-posta adresi giriniz.");
      return;
    }

    if (form.telefon && form.telefon.trim()) {
      const phoneRegex = /^[\d\s\-+()]+$/;
      if (!phoneRegex.test(form.telefon) || form.telefon.length < 10) {
        setError("Geçerli bir telefon numarası giriniz.");
        return;
      }
    }
    
    try {
      const updateData = {
        id: currentUser.kullanici_id,
        ad: form.ad.trim(),
        soyad: form.soyad.trim(),
        email: form.email.trim(),
        telefon: form.telefon.trim() || null,
        tc: form.tc,
        durum: currentUser.status ? 1 : 0
      };

      console.log('Profile Component - Updating user with data:', updateData);
      const updatedUser = await updateUserMutation(updateData).unwrap();
      
      console.log('Profile Component - Update successful:', updatedUser);
      dispatch(updateUser({
        ad: form.ad.trim(),
        soyad: form.soyad.trim(),
        email: form.email.trim(),
        telefon: form.telefon.trim() || null
      }));

      setEditMode(false);
      setSuccess("Profil başarıyla güncellendi!");
      
  
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error('Profil güncelleme hatası:', err);
      setError(err?.data?.message || err?.message || 'Profil güncellenirken bir hata oluştu');
    }
  };

  const handleCancel = () => {

    if (currentUser) {
      setForm({
        ad: currentUser.ad || '',
        soyad: currentUser.soyad || '',
        email: currentUser.email || '',
        telefon: currentUser.telefon || '',
        tc: currentUser.tc || '',
        rol_adi: currentUser.ana_rol_adi || '',
      });
    }
    setEditMode(false);
    setError("");
    setSuccess("");
  };


  useEffect(() => {

    console.log('Profile useEffect - State:', {
      isAuthenticated,
      currentUser,
      isUpdating,
      rolesLoading,
      isAuthLoaded
    });

  }, [isAuthenticated, currentUser, navigate, isUpdating, rolesLoading, isAuthLoaded]);

  if (!isAuthLoaded || isUpdating || rolesLoading || (isAuthenticated && !currentUser)) {
    return (
      <div className="profile-page">
        <div className="profile-error-card">
          <div className="error-icon">⏳</div>
          <h3>Profil Yükleniyor...</h3>
          <p>Lütfen bekleyiniz.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <div className="profile-avatar-text">
                {((currentUser.ad || '').charAt(0) + (currentUser.soyad || '').charAt(0)).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="profile-title">
            <h1>{currentUser.ad || 'Ad Yok'} {currentUser.soyad || 'Soyad Yok'}</h1>
            <p className="profile-subtitle">{currentUser.ana_rol_adi || 'Rol Belirtilmemiş'}</p>
            <p className="profile-id">Kullanıcı ID: {currentUser.kullanici_id}</p>
          </div>
        </div>

        {/* Alert Messages */}
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">❌</span>
            {error}
          </div>
        )}

        {/* Profile Content */}
        <div className="profile-content">
          {editMode ? (
            <div className="profile-edit-section">
              <div className="section-header">
                <h2>
                  <span className="section-icon">✏️</span>
                  Profili Düzenle
                </h2>
              </div>
              
              <form className="profile-form" onSubmit={handleSave}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <span className="label-icon">👤</span>
                      Ad *
                    </label>
                    <input
                      type="text"
                      name="ad"
                      value={form.ad}
                      onChange={handleChange}
                      required
                      disabled={isUpdating}
                      placeholder="Adınızı giriniz"
                      maxLength="50"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">👤</span>
                      Soyad *
                    </label>
                    <input
                      type="text"
                      name="soyad"
                      value={form.soyad}
                      onChange={handleChange}
                      required
                      disabled={isUpdating}
                      placeholder="Soyadınızı giriniz"
                      maxLength="50"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">📧</span>
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={isUpdating}
                      placeholder="E-posta adresinizi giriniz"
                      maxLength="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">📱</span>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      value={form.telefon}
                      onChange={handleChange}
                      disabled={isUpdating}
                      placeholder="Telefon numaranızı giriniz (opsiyonel)"
                      maxLength="20"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">🆔</span>
                      TC Kimlik No
                    </label>
                    <input
                      type="text"
                      name="tc"
                      value={form.tc}
                      disabled
                      className="disabled-field"
                      title="TC Kimlik numarası değiştirilemez"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">🎭</span>
                      Rol
                    </label>
                    <input
                      type="text"
                      name="rol_adi"
                      value={form.rol_adi}
                      disabled
                      className="disabled-field"
                      title="Rol yalnızca sistem yöneticisi tarafından değiştirilebilir"
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <span className="spinner"></span>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">💾</span>
                        Kaydet
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    <span className="btn-icon">❌</span>
                    İptal
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-view-section">
              <div className="section-header">
                <h2>
                  <span className="section-icon">📋</span>
                  Profil Bilgileri
                </h2>
              </div>
              
              <div className="profile-info-grid">
                <div className="info-card">
                  <div className="info-icon">👤</div>
                  <div className="info-content">
                    <label>Ad</label>
                    <p>{currentUser.ad || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">👤</div>
                  <div className="info-content">
                    <label>Soyad</label>
                    <p>{currentUser.soyad || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <label>E-posta</label>
                    <p>{currentUser.email || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <label>Telefon</label>
                    <p>{currentUser.telefon || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🆔</div>
                  <div className="info-content">
                    <label>TC Kimlik No</label>
                    <p>{currentUser.tc || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🎭</div>
                  <div className="info-content">
                    <label>Rol</label>
                    <p>
                      {
                        currentUser?.rol_ids && currentUser.rol_ids.length > 0
                          ? currentUser.rol_ids.map(id => {
                              const role = roles.find(r => r.rol_id === id);
                              return role ? role.rol_adi : `ID: ${id}`;
                            }).join(', ')
                          : 'Belirtilmemiş'
                      }
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📅</div>
                  <div className="info-content">
                    <label>Kayıt Tarihi</label>
                    <p>{currentUser.insert_date ? new Date(currentUser.insert_date).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🔄</div>
                  <div className="info-content">
                    <label>Son Güncelleme</label>
                    <p>{currentUser.update_date ? new Date(currentUser.update_date).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">✅</div>
                  <div className="info-content">
                    <label>Hesap Durumu</label>
                    <p style={{ color: currentUser.status ? '#51a646' : '#dc3545' }}>
                      {currentUser.status ? 'Aktif' : 'Pasif'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button 
                  className="btn btn-primary btn-large" 
                  onClick={() => setEditMode(true)}
                >
                  <span className="btn-icon">✏️</span>
                  Profili Düzenle
                </button>
                <button 
                  className="btn btn-secondary btn-large" 
                  onClick={() => setPasswordChangeMode(true)}
                >
                  <span className="btn-icon">🔒</span>
                  Şifre Değiştir
                </button>
              </div>
            </div>
          )}

          {/* Şifre Değiştirme Bölümü */}
          {passwordChangeMode && (
            <div className="profile-edit-section">
              <div className="section-header">
                <h2>
                  <span className="section-icon">🔒</span>
                  Şifre Değiştir
                </h2>
              </div>
              
              <form className="profile-form" onSubmit={handlePasswordSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <span className="label-icon">🔑</span>
                      Mevcut Şifre *
                    </label>
                    <input
                      type="password"
                      name="mevcut_sifre"
                      value={passwordForm.mevcut_sifre}
                      onChange={handlePasswordChange}
                      required
                      disabled={isChangingPassword}
                      placeholder="Mevcut şifrenizi giriniz"
                      minLength="6"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">🔒</span>
                      Yeni Şifre *
                    </label>
                    <input
                      type="password"
                      name="yeni_sifre"
                      value={passwordForm.yeni_sifre}
                      onChange={handlePasswordChange}
                      required
                      disabled={isChangingPassword}
                      placeholder="Yeni şifrenizi giriniz"
                      minLength="6"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <span className="label-icon">🔒</span>
                      Yeni Şifre Tekrar *
                    </label>
                    <input
                      type="password"
                      name="yeni_sifre_tekrar"
                      value={passwordForm.yeni_sifre_tekrar}
                      onChange={handlePasswordChange}
                      required
                      disabled={isChangingPassword}
                      placeholder="Yeni şifrenizi tekrar giriniz"
                      minLength="6"
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isChangingPassword}>
                    {isChangingPassword ? (
                      <>
                        <span className="spinner"></span>
                        Değiştiriliyor...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">💾</span>
                        Şifreyi Değiştir
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handlePasswordCancel}
                    disabled={isChangingPassword}
                  >
                    <span className="btn-icon">❌</span>
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 