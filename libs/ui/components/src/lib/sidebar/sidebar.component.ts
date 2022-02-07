import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'zigzag';
import { IconModule } from '../icon/icon.module';

@Component({
  selector: 'flare-sidebar',
  template: `
    <div class="px-6 pt-10">
      <header class="mb-6 px-6">
        <p class="font-bold text-xl">Flare</p>
      </header>
      <nav>
        <ul class="gap-4 flex flex-col font-medium text-lg text-slate-700">
          <li>
            <rmx-icon name="home-2-line"></rmx-icon>
            Home
          </li>
          <li>
            <rmx-icon name="compass-3-line"></rmx-icon>
            Discover
          </li>
          <li>
            <rmx-icon name="notification-4-line"></rmx-icon>
            Notifications
          </li>
          <li>
            <rmx-icon name="user-3-line"></rmx-icon>
            Profile
          </li>
          <li>
            <rmx-icon name="bookmark-line"></rmx-icon>
            Bookmarks
          </li>
        </ul>
      </nav>
      <div class="mt-10">
        <button class="w-full text-lg" zzButton variant="primary">
          New Flare
        </button>
      </div>
    </div>
    <footer
      class="p-4 flex gap-4 cursor-pointer hover:bg-slate-100 border-t border-slate-200"
    >
      <img
        src="https://pbs.twimg.com/profile_images/1453540707294072838/nHn3I7UT_400x400.jpg"
        alt="Adithya Sreyaj"
        class="w-12 h-12 rounded-full"
      />
      <div class="">
        <p class="font-medium">Adithya Sreyaj</p>
        <p>@AdiSreyaj</p>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col justify-between w-full h-full rounded-lg border-r border-slate-200;
      }

      ul li {
        @apply flex items-center gap-2 px-6 py-2 hover:bg-slate-200 text-slate-900 rounded-full cursor-pointer transition-all duration-200;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarComponentModule {}